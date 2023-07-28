import React, { useEffect } from "react";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import unsplash from "./Image/unsplash.jpg";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const styles = StyleSheet.create({
  body: {
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  text: {
    margin: 15,
    fontSize: 20,
    textAlign: "justify",
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  pageNumber: {
    position: "absolute",
    bottom: 1,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
const PDFfile = ({ data }) => {
  console.log("props", data);
  data?.map((meal) => console.log(meal));

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text>
          <table>
            <thead>
              <th>Week Day</th>
              <th>Meal Type</th>
              <th>Label</th>
            </thead>
            <tbody>
              <tr>
                <td> Monday</td>
                <td> Lunch</td>
                <td> paneer</td>
              </tr>
            </tbody>
          </table>
        </Text>
        {/* <View>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="TableHeader">
              <TableRow>
                <TableCell className="TableHeading" align="center">
                  Week Day
                </TableCell>
                <TableCell className="TableHeading" align="center">
                  Week Day
                </TableCell>
                <TableCell className="TableHeading" align="center">
                  Label
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className="TableHeading" align="center">
                  Monday
                </TableCell>
                <TableCell className="TableHeading" align="center">
                  Lunch
                </TableCell>
                <TableCell className="TableHeading" align="center">
                  Panner
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </View> */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            ` ${pageNumber}/ ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
};

export default PDFfile;
