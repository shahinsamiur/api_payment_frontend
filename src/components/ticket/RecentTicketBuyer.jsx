import Card from "../libs/Card";
import Typography from "../libs/Typography";

const RecentTicketBuyer = ({ data }) => {
  const wrapperClass =
    "flex items-center justify-between bg-border/30 hover:bg-border/80 border border-border rounded-lg px-5 py-2 hover:translate-x-2 transition-all duration-300";

  return (
    <Card>
      <Typography variant="h5">Recent purchases</Typography>
      <div className="space-y-2">
        {data && data.length ? (
          data.map((data, index) => (
            <div key={index}>
              <div className={wrapperClass}>
                <Typography variant="body1" className="font-medium">
                  {data.user}
                </Typography>

                <Typography variant="h5" className="font-medium">
                  {data.ticket_buy}
                </Typography>
              </div>
            </div>
          ))
        ) : (
          <div>
            <Typography variant="body2" align="center">
              No Purchases
            </Typography>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecentTicketBuyer;
