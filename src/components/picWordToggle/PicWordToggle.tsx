import "./PicWordToggle.css";

interface PicWordToggleProps {
  showPic: boolean;
  setShowPic: (value: boolean) => void;
}

const PicWordToggle = ({ showPic, setShowPic }: PicWordToggleProps) => {
  return (
    <div className="picword-toggle">
      <span className="picword-toggle-text">Show Images</span>
      <label className="picword-toggle-label">
        <input
          type="checkbox"
          checked={showPic}
          onChange={() => setShowPic(!showPic)}
        />
        <span className={`picword-toggle-slider ${showPic ? "on" : "off"}`}></span>
        <span className={`picword-toggle-circle ${showPic ? "on" : "off"}`}></span>
      </label>
    </div>
  );
};

export default PicWordToggle;