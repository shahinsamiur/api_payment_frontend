"use client";

import LoadingIndicator from "@/components/common/LoadingIndicator";
import Markque from "@/components/common/Markque";
import Card from "@/components/libs/Card";
import Table from "@/components/libs/Table";
import TableContainer from "@/components/libs/TableContainer";
import TableHead from "@/components/libs/TableHead";
import Typography from "@/components/libs/Typography";
import { useGetUserByCatagoryQuery } from "@/store/features/top-user-catagory";

export default function TopJogPoster() {
  const { data: topJobPoster, isLoading } = useGetUserByCatagoryQuery();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const data = topJobPoster?.data?.top_job_providers;

  return (
    <Card>
      <Typography variant="h4" color="primary">
        Top Providers
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
              <td>Post</td>
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

                  <td>{data["job_posted_count"]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No data found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </Card>
  );
}
