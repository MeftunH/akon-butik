/**
 * Vendor `dashboard/OrderDetails.tsx` `order-timeline > timeline-step` mirror.
 * A vertical step list with an icon per step; completed steps render in the
 * vendor green tone (background-color: #2c8153 on `.timeline-step.completed`).
 *
 * Shared by admin order-detail and storefront `/account/orders/:id` so the
 * canonical "where is my order" view is one component. State-derivation lives
 * at the call site (admin maps Order.status + shipments[] to step completion).
 */

export interface OrderTimelineStep {
  /** Stable id used as React key. */
  key: string;
  /** Title rendered as `step-title`. */
  title: string;
  /** Optional date / subtitle line under the title. */
  date?: string | null;
  /** Optional detail rows shown below the date. */
  details?: readonly string[];
  /** Whether the step is "done" (vendor green icon + connector). */
  completed: boolean;
  /** Optional icomoon icon class (defaults to `icon-check-1`). */
  icon?: string;
}

export interface OrderTimelineProps {
  steps: readonly OrderTimelineStep[];
}

export function OrderTimeline({ steps }: OrderTimelineProps) {
  return (
    <div className="order-timeline">
      {steps.map((step) => (
        <div key={step.key} className={`timeline-step${step.completed ? ' completed' : ''}`}>
          <div className="timeline_icon">
            <span className="icon">
              <i className={step.icon ?? 'icon-check-1'} />
            </span>
          </div>
          <div className="timeline_content">
            <h5 className="step-title fw-semibold">{step.title}</h5>
            {step.date && <h6 className="step-date fw-normal">{step.date}</h6>}
            {step.details?.map((detail, idx) => (
              <p key={`${step.key}-detail-${idx.toString()}`} className="step-detail h6 mb-0">
                {detail}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
