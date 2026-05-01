import type { JSX } from 'react';

/**
 * Tiny, deliberately limited markdown renderer for v1 blog bodies.
 *
 * Supports:
 *   - `## Heading 2`  -> <h2 class="h3">
 *   - `### Heading 3` -> <h3 class="h5">
 *   - blank-line separated paragraphs (with inline bold + italic + links)
 *   - `**bold**` and `*italic*`
 *   - `[label](https://example.com)` autolinks (https + relative `/...` only)
 *
 * Everything else is rendered as plain text. We intentionally avoid the
 * weight of `react-markdown` + `remark-gfm` for v1: the editorial copy
 * shipped during seed is hand-controlled. Swap to a real markdown parser
 * (`react-markdown` + `rehype-sanitize`) when the CMS lets non-engineers
 * author posts.
 *
 * Safety: bodyMd is treated as untrusted. Every text segment is escaped
 * to plain strings before being rendered, and the only HTML emitted is
 * the structural JSX produced by this component itself, no
 * `dangerouslySetInnerHTML`, no raw HTML passthrough.
 *
 * TODO(blog): replace with `react-markdown` + sanitize once a content
 * editor lands in the admin app and we need tables/lists/images inline.
 */
export function RenderMarkdown({ source }: { source: string }): JSX.Element {
  const blocks = splitBlocks(source);
  return <div className="blog-body">{blocks.map((block, idx) => renderBlock(block, idx))}</div>;
}

interface Block {
  kind: 'h2' | 'h3' | 'p';
  raw: string;
}

function splitBlocks(source: string): Block[] {
  // Normalise line endings, then split on one-or-more blank lines.
  const normalised = source.replace(/\r\n/g, '\n').trim();
  if (!normalised) return [];

  const chunks = normalised.split(/\n{2,}/);
  return chunks.map((chunk): Block => {
    const trimmed = chunk.trim();
    if (trimmed.startsWith('### ')) return { kind: 'h3', raw: trimmed.slice(4) };
    if (trimmed.startsWith('## ')) return { kind: 'h2', raw: trimmed.slice(3) };
    return { kind: 'p', raw: trimmed };
  });
}

function renderBlock(block: Block, index: number): JSX.Element {
  const inline = renderInline(block.raw, `${block.kind}-${index.toString()}`);
  if (block.kind === 'h2') {
    return (
      <h2 key={index} className="h3 mt-5 mb-3">
        {inline}
      </h2>
    );
  }
  if (block.kind === 'h3') {
    return (
      <h3 key={index} className="h5 mt-4 mb-3">
        {inline}
      </h3>
    );
  }
  return (
    <p key={index} className="mb-4">
      {inline}
    </p>
  );
}

type InlineNode = string | JSX.Element;

/**
 * Walks a single block of body text and emits an array of strings + JSX
 * elements. Bold + italic + links are recognised by simple regex; the
 * rest of the input is preserved as-is (and React escapes it).
 */
function renderInline(input: string, keyBase: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let cursor = 0;
  let elementIndex = 0;
  // Combined matcher: bold | italic | link, in that order. Bold must
  // win over italic so `**text**` doesn't read as italic-italic.
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(input)) !== null) {
    if (match.index > cursor) {
      nodes.push(input.slice(cursor, match.index));
    }
    const key = `${keyBase}-${elementIndex.toString()}`;
    elementIndex += 1;
    if (match[1] !== undefined) {
      nodes.push(<strong key={key}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      nodes.push(<em key={key}>{match[2]}</em>);
    } else if (match[3] !== undefined && match[4] !== undefined) {
      const href = match[4];
      const isExternal = /^https?:\/\//i.test(href);
      nodes.push(
        <a
          key={key}
          href={href}
          {...(isExternal && { rel: 'noopener noreferrer', target: '_blank' })}
          className="link"
        >
          {match[3]}
        </a>,
      );
    }
    cursor = match.index + match[0].length;
  }
  if (cursor < input.length) {
    nodes.push(input.slice(cursor));
  }
  return nodes;
}
