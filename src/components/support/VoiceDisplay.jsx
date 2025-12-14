export default function VoiceDisplay({ url }) {
  return (
    <div>
      <audio controls>
        <source src={url} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
