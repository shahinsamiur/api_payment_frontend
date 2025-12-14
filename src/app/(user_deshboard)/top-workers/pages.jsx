"use client";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import Markque from "@/components/common/Markque";
import Card from "@/components/libs/Card";
import Ratings from "@/components/libs/Ratings";
import Table from "@/components/libs/Table";
import TableContainer from "@/components/libs/TableContainer";
import TableHead from "@/components/libs/TableHead";
import Typography from "@/components/libs/Typography";
import { useGetUserByCatagoryQuery } from "@/store/features/top-user-catagory";

export default function TopWorker() {
  const { data: topWorker, isLoading } = useGetUserByCatagoryQuery();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const data = topWorker?.data?.top_workers;

  return (
    <Card>
      <Typography variant="h4" color="primary">
        Top Workers
      </Typography>
      <Markque />

      <TableContainer>
        <Table>
          <TableHead>
            <tr>
              <td>Rank</td>
              <td>
                <Typography align="left">Name</Typography>
              </td>
              <td>Ratinng</td>
              <td>Work</td>
            </tr>
          </TableHead>
          <tbody>
            {data?.length ? (
              data.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Typography align="left" variant="body2">
                      {data.user.name}
                    </Typography>
                  </td>
                  <td>
                    <div className="flex justify-center grow">
                      <Ratings rating={data.user.user_rating.star_rating} />
                    </div>
                  </td>
                  <td>{data.user.user_rating.total_submissions}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No Data Found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </Card>
  );
}
