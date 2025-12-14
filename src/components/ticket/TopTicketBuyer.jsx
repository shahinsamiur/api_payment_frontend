import Card from "../libs/Card";
import IconButton from "../libs/IconButton";
import Typography from "../libs/Typography";

const TopTicketBuyer = ({ data }) => {
  const wrapperClass =
    "flex items-center justify-between bg-border/30 border hover:bg-border/80 border-border rounded-lg px-5 py-2 hover:translate-x-2 transition-all duration-300";

  return (
    <Card>
      <Typography variant="h5">Top ticket buyers</Typography>
      <div className="space-y-2">
        {data && data.length ? (
          data.map((data, index) => (
            <div key={index} className={wrapperClass}>
              <div className="flex items-center gap-3">
                <IconButton
                  className={`font-semibold ${
                    index === 0 ? "!bg-warning" : ""
                  }`}
                >
                  {data.rank}
                </IconButton>
                <Typography variant="body1" className="font-medium">
                  {data.user}
                </Typography>
              </div>
              <Typography variant="h5" className="font-medium">
                {data.ticket_buy}
              </Typography>
            </div>
          ))
        ) : (
          <div>
            <Typography variant="body2" align="center">
              No Buyer
            </Typography>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TopTicketBuyer;
