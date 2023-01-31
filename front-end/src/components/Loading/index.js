import './style.css';

function Loading() {
  return (
    <div
      className="flex items-center
    justify-center h-screen bg-gradient-to-b from-[#baf7ce] to-main-green"
    >
      <div className="lds-default">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loading;
