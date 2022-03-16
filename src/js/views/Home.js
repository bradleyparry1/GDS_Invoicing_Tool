import React, { useContext } from "react";
import AppContext from "./AppContext";
import ToolbarSection from "../components/ui/ToolbarSection";
import DepartmentsTable from "../components/DepartmentsList";
import ProductSelect from "../components/ProductSelect";
import FySelect from "../components/FySelect";
import ProgressBar from "react-bootstrap/ProgressBar";
import DepartmentStats from "../components/DepartmentStats";

function Home() {
  const { loading } = useContext(AppContext);
  return (
    <div id="display">
      {loading ? (
        <div style={{ padding: "50px" }}>
          <ProgressBar animated now={100} label={"Loading..."} />
        </div>
      ) : (
        <>
          <ToolbarSection>
            <ProductSelect />
            <FySelect />
            <DepartmentStats />
          </ToolbarSection>
          <DepartmentsTable />
        </>
      )}
    </div>
  );
}

export default Home;
