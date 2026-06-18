type SpinnerProps = {
  label?: string;
};

export function Spinner({ label }: SpinnerProps) {
  return (
    <div className="spinner" role="status">
      <span className="spinner__mark" aria-hidden="true" />
      {label && <span>{label}</span>}
    </div>
  );
}
