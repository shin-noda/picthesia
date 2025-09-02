import "./BallsFuseToggle.css";

interface BallsFuseToggleProps {
  fusionEnabled: boolean;
  setFusionEnabled: (value: boolean) => void;
}

const BallsFuseToggle = ({
  fusionEnabled,
  setFusionEnabled,
}: BallsFuseToggleProps) => {
  return (
    <div className="balls-fuse-toggle">
      <span className="balls-fuse-toggle-text">Enable Fusion (fuse 2 balls max)</span>
      <label className="balls-fuse-toggle-label">
        <input
          type="checkbox"
          checked={fusionEnabled}
          onChange={() => setFusionEnabled(!fusionEnabled)}
        />
        <span
          className={`balls-fuse-toggle-slider ${fusionEnabled ? "on" : "off"}`}
        ></span>
        <span
          className={`balls-fuse-toggle-circle ${fusionEnabled ? "on" : "off"}`}
        ></span>
      </label>
    </div>
  );
};

export default BallsFuseToggle;