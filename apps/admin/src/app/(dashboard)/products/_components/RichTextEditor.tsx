'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';

import styles from './RichTextEditor.module.scss';

export interface RichTextEditorProps {
  /** Markdown source. The editor parses it on mount and renders HTML. */
  value: string;
  /** Called with serialized markdown after every meaningful edit. */
  onChange: (markdown: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string | undefined;
}

interface ToolbarButton {
  /** execCommand identifier or our custom action. */
  command:
    | 'bold'
    | 'italic'
    | 'h2'
    | 'h3'
    | 'ul'
    | 'ol'
    | 'blockquote'
    | 'link'
    | 'paragraph'
    | 'clear';
  label: string;
  /** Glyph rendered as the button face. Plain text, no icon font. */
  glyph: string;
}

const TOOLBAR: readonly ToolbarButton[] = [
  { command: 'h2', label: 'Başlık 2', glyph: 'H2' },
  { command: 'h3', label: 'Başlık 3', glyph: 'H3' },
  { command: 'paragraph', label: 'Paragraf', glyph: '¶' },
  { command: 'bold', label: 'Kalın', glyph: 'B' },
  { command: 'italic', label: 'İtalik', glyph: 'I' },
  { command: 'ul', label: 'Madde listesi', glyph: '•' },
  { command: 'ol', label: 'Numaralı liste', glyph: '1.' },
  { command: 'blockquote', label: 'Alıntı', glyph: '"' },
  { command: 'link', label: 'Bağlantı ekle', glyph: '↗' },
  { command: 'clear', label: 'Biçimi temizle', glyph: '⌫' },
];

/**
 * Lightweight rich-text editor. We deliberately skip ProseMirror, Lexical
 * and friends because:
 *  - the data we ship is a few-paragraph product description
 *  - the operator team is two people, not a CMS audience
 *  - no extra runtime is worth adding for one form
 *
 * Implementation: a contenteditable div + document.execCommand. Yes, the
 * spec is "deprecated"; the browsers still honour it on every engine and
 * no replacement covers the same surface in 2026. When that changes,
 * swap the body of `runCommand` with the modern selection / range
 * primitives. The serializer is a tiny HTML to Markdown converter
 * tuned for the inverse of `markdownToHtml` below; both sides only
 * understand the subset our toolbar produces.
 *
 * Persisted value is Markdown so the existing `descriptionMd` API
 * contract is unchanged.
 */
export function RichTextEditor({
  value,
  onChange,
  placeholder,
  ariaLabel,
  ariaInvalid,
  ariaDescribedBy,
}: RichTextEditorProps) {
  const editorId = useId();
  const editorRef = useRef<HTMLDivElement>(null);
  const lastEmittedRef = useRef<string>(value);
  const [isEmpty, setIsEmpty] = useState(value.trim().length === 0);

  // Hydrate the editor's HTML from the Markdown source on mount and
  // whenever the parent passes a new value that we did not produce.
  useEffect(() => {
    const node = editorRef.current;
    if (!node) return;
    if (value === lastEmittedRef.current) return;
    node.innerHTML = markdownToHtml(value);
    setIsEmpty(node.textContent?.trim().length === 0);
    lastEmittedRef.current = value;
  }, [value]);

  const emit = useCallback((): void => {
    const node = editorRef.current;
    if (!node) return;
    const md = htmlToMarkdown(node.innerHTML);
    lastEmittedRef.current = md;
    setIsEmpty(node.textContent?.trim().length === 0);
    onChange(md);
  }, [onChange]);

  const runCommand = useCallback(
    (button: ToolbarButton): void => {
      const node = editorRef.current;
      if (!node) return;
      node.focus();

      // TODO: replace document.execCommand with Selection / Range API
      // primitives once browsers ship a stable replacement (current
      // spec status, May 2026: still the only cross-engine surface).
      switch (button.command) {
        case 'bold':
        case 'italic': {
          document.execCommand(button.command);
          break;
        }
        case 'h2':
        case 'h3':
        case 'paragraph': {
          const tag = button.command === 'paragraph' ? 'P' : button.command.toUpperCase();
          document.execCommand('formatBlock', false, tag);
          break;
        }
        case 'ul': {
          document.execCommand('insertUnorderedList');
          break;
        }
        case 'ol': {
          document.execCommand('insertOrderedList');
          break;
        }
        case 'blockquote': {
          document.execCommand('formatBlock', false, 'BLOCKQUOTE');
          break;
        }
        case 'link': {
          const url = window.prompt('Bağlantı adresi (https://...)', 'https://');
          if (url && /^https?:\/\//i.test(url)) {
            document.execCommand('createLink', false, url);
          }
          break;
        }
        case 'clear': {
          document.execCommand('removeFormat');
          document.execCommand('formatBlock', false, 'P');
          break;
        }
      }
      emit();
    },
    [emit],
  );

  return (
    <div className={styles.wrap} data-invalid={ariaInvalid ? 'true' : 'false'}>
      <div className={styles.toolbar} role="toolbar" aria-label="Metin biçimleme">
        {TOOLBAR.map((b) => (
          <button
            key={b.command}
            type="button"
            className={styles.toolButton}
            data-glyph={b.command}
            title={b.label}
            aria-label={b.label}
            onMouseDown={(e) => {
              // Prevent the editor from losing selection when the
              // toolbar receives the click.
              e.preventDefault();
            }}
            onClick={() => {
              runCommand(b);
            }}
          >
            <span aria-hidden>{b.glyph}</span>
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        id={editorId}
        className={styles.editor}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline
        aria-label={ariaLabel}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        data-empty={isEmpty ? 'true' : 'false'}
        data-placeholder={placeholder ?? ''}
        onInput={emit}
        onBlur={emit}
        onPaste={(e) => {
          // Paste plain text only, so we never inherit foreign styles.
          e.preventDefault();
          const text = e.clipboardData.getData('text/plain');
          document.execCommand('insertText', false, text);
        }}
      />
    </div>
  );
}

/**
 * Markdown to HTML for hydration. Subset only: H2, H3, paragraph,
 * bold, italic, links, ul/ol, blockquote. Anything richer round-trips
 * as paragraphs of plain text.
 */
function markdownToHtml(md: string): string {
  if (md.trim().length === 0) return '';
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let inQuote = false;

  const closeList = (): void => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };
  const closeQuote = (): void => {
    if (inQuote) {
      out.push('</blockquote>');
      inQuote = false;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.length === 0) {
      closeList();
      closeQuote();
      continue;
    }

    const h2 = /^##\s+(.*)$/.exec(line);
    const h3 = /^###\s+(.*)$/.exec(line);
    const ul = /^[-*]\s+(.*)$/.exec(line);
    const ol = /^\d+\.\s+(.*)$/.exec(line);
    const bq = /^>\s?(.*)$/.exec(line);

    if (h2) {
      closeList();
      closeQuote();
      out.push(`<h2>${inlineMdToHtml(h2[1] ?? '')}</h2>`);
      continue;
    }
    if (h3) {
      closeList();
      closeQuote();
      out.push(`<h3>${inlineMdToHtml(h3[1] ?? '')}</h3>`);
      continue;
    }
    if (ul) {
      closeQuote();
      if (listType !== 'ul') {
        closeList();
        listType = 'ul';
        out.push('<ul>');
      }
      out.push(`<li>${inlineMdToHtml(ul[1] ?? '')}</li>`);
      continue;
    }
    if (ol) {
      closeQuote();
      if (listType !== 'ol') {
        closeList();
        listType = 'ol';
        out.push('<ol>');
      }
      out.push(`<li>${inlineMdToHtml(ol[1] ?? '')}</li>`);
      continue;
    }
    if (bq) {
      closeList();
      if (!inQuote) {
        out.push('<blockquote>');
        inQuote = true;
      }
      out.push(`<p>${inlineMdToHtml(bq[1] ?? '')}</p>`);
      continue;
    }

    closeList();
    closeQuote();
    out.push(`<p>${inlineMdToHtml(line)}</p>`);
  }
  closeList();
  closeQuote();
  return out.join('\n');
}

function inlineMdToHtml(s: string): string {
  return escapeHtml(s)
    .replaceAll(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replaceAll(/\*([^*]+)\*/g, '<em>$1</em>')
    .replaceAll(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * HTML to Markdown serializer. Walks a temp DOM and emits Markdown for
 * the same subset markdownToHtml understands. Anything richer is
 * collapsed to plain text.
 */
function htmlToMarkdown(html: string): string {
  if (html.trim().length === 0) return '';
  const sandbox = document.createElement('div');
  sandbox.innerHTML = html;
  return walkNodes(sandbox.childNodes).trim();
}

function walkNodes(nodes: NodeListOf<ChildNode> | ChildNode[]): string {
  let out = '';
  for (const node of Array.from(nodes)) {
    out += serializeNode(node);
  }
  return out;
}

function serializeNode(node: ChildNode): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return (node.textContent ?? '').replaceAll('\u00a0', ' ');
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return '';
  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();
  const inner = walkNodes(el.childNodes);
  switch (tag) {
    case 'h1':
    case 'h2': {
      return `\n## ${inner.trim()}\n\n`;
    }
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      return `\n### ${inner.trim()}\n\n`;
    }
    case 'p': {
      return `${inner}\n\n`;
    }
    case 'br': {
      return '\n';
    }
    case 'strong':
    case 'b': {
      return `**${inner}**`;
    }
    case 'em':
    case 'i': {
      return `*${inner}*`;
    }
    case 'a': {
      const href = el.getAttribute('href') ?? '';
      return /^https?:\/\//i.test(href) ? `[${inner}](${href})` : inner;
    }
    case 'ul': {
      return `\n${Array.from(el.children)
        .map((li) => `- ${walkNodes(li.childNodes).trim()}`)
        .join('\n')}\n\n`;
    }
    case 'ol': {
      return `\n${Array.from(el.children)
        .map((li, i) => `${(i + 1).toString()}. ${walkNodes(li.childNodes).trim()}`)
        .join('\n')}\n\n`;
    }
    case 'blockquote': {
      return `\n${inner
        .trim()
        .split(/\r?\n/)
        .map((l) => `> ${l}`)
        .join('\n')}\n\n`;
    }
    case 'div': {
      return inner.endsWith('\n') ? inner : `${inner}\n`;
    }
    default: {
      return inner;
    }
  }
}
