import { Navigate, useParams } from "react-router-dom";
import { qpBtechSemester, qpBtechBranch, QP_BTECH_BRANCHES } from "../lib/questionPaperPaths";

export function LegacyAllcourcesRoot() {
  return <Navigate to="/allcourse" replace />;
}

export function LegacyAllcourcesCourse() {
  const { course } = useParams();
  return <Navigate to={`/allcourse/${course}`} replace />;
}

export function LegacyAllcourcesBtech() {
  return <Navigate to={QP_BTECH_BRANCHES} replace />;
}

export function LegacyAllcourcesBtechBranch() {
  const { branch } = useParams();
  return <Navigate to={qpBtechBranch(branch)} replace />;
}

export function LegacyAllcourcesBtechSemester() {
  const { branch, semesterId } = useParams();
  return <Navigate to={qpBtechSemester(branch, semesterId)} replace />;
}
