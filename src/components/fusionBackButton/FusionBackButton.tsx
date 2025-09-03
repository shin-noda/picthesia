import "./FusionBackButton.css";

interface FusionBackButtonProps {
  onBack: () => void;
}

const FusionBackButton = ({ onBack }: FusionBackButtonProps) => {
  return (
    <div className="back-button-container">
      <button onClick={onBack} className="back-button">
        ← Back
      </button>
    </div>
  );
};

export default FusionBackButton;
