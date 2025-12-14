import Card from "../libs/Card";
import IconButton from "../libs/IconButton";
import Typography from "../libs/Typography";

const PreviousDayWinner = ({ data }) => {
  const wrapperClass =
    "border border-warning/30 bg-warning/20 dark:bg-warning/10 rounded-lg px-5 py-2 flex items-center justify-between gap-5";

  return (
    <Card className="grow">
      <Typography variant="h5">Previous day winner</Typography>

      {data && data.length ? (
        data.map((data, index) => (
          <div key={index} className={wrapperClass}>
            <div className="flex items-center gap-3">
              <IconButton className="font-semibold !bg-warning">
                {data.rank}
              </IconButton>
              <Typography variant="body1" className="font-medium">
                {data.user}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="warning">
                ${data.reward}
              </Typography>
              <Typography
                variant="body2"
                color="warning"
                align="center"
                className="font-medium"
              >
                Reward
              </Typography>
            </div>
          </div>
        ))
      ) : (
        <div>
          <Typography variant="body2" align="center">
            No previous day winner
          </Typography>
        </div>
      )}
    </Card>
  );
};

export default PreviousDayWinner;
