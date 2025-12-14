import ZoomedImage from "../common/ZoomedImage";

export default function ImageDisplay({ url, senderType }) {
  return (
    <div
      className={`flex mb-1 rounded-md overflow-hidden ${
        senderType === "user" ? "justify-end" : "items-start"
      }`}
    >
      <ZoomedImage img={url} baseUrl={false} height={150} />
    </div>
  );
}
