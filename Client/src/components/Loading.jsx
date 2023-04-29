import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="centered">
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
};

export default Loading;
