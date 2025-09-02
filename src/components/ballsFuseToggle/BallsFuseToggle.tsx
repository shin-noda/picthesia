import "./BallsFuseToggle.css";

// Interface for component props
interface BallsFuseToggleProps {
  fusionEnabled: boolean;
  setFusionEnabled: (value: boolean) => void;
}

const BallsFuseToggle = ({ fusionEnabled, setFusionEnabled }: BallsFuseToggleProps) => {
  // Handler function for the toggle change
  const handleToggleChange = () => {
    setFusionEnabled(!fusionEnabled);
  };

  return (
    <div className="balls-fuse-toggle">
      <span className="balls-fuse-toggle-text">Enable Fusion</span>
      <label className="balls-fuse-toggle-label">
        <input
          type="checkbox"
          checked={fusionEnabled}
          onChange={handleToggleChange}
        />
        <span className={`balls-fuse-toggle-slider ${fusionEnabled ? "on" : "off"}`}></span>
        <span className={`balls-fuse-toggle-circle ${fusionEnabled ? "on" : "off"}`}></span>
      </label>
    </div>
  );
};

export default BallsFuseToggle;