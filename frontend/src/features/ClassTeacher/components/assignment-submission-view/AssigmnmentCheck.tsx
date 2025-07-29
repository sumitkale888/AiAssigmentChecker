import React from "react";
import useFetch from "../../../../shared/hooks/UseFetch";
// import getFileIcon from "../../../../shared/utils/getFileIcon";
const AssignmentCheck: React.FC<{
  submission_id: string | undefined;
  student_id: string | undefined;
}> = ({ submission_id, student_id }) => {
  const {
    data: assignmentsMetadata,
    error: assignmentsMetadataError,
    status: assignmentsMetadataStatus,
    // refetch: assignmentsMetadataRefetch,
  } = useFetch<any[]>({
    method: "GET",
    url: `http://localhost:3000/api/teacher/submission/${submission_id}/student/${student_id}`,
  });

  if (assignmentsMetadataStatus === "loading") return <p>Loading...</p>;
  if (assignmentsMetadataError) return <p>Error fetching data.</p>;
  if (!assignmentsMetadata || assignmentsMetadata.length === 0) return <p>No data found.</p>;

  const data = assignmentsMetadata[0];

  return (
    <div style={{ padding: "1rem", maxWidth: "600px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>{data.first_name} {data.last_name}</h2>
        <h3>{data.obtained_grade}/100</h3>
      </div>
      <p style={{ color: "gray", marginBottom: "1rem" }}>Graded (See history)</p>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#f9f9f9"
      }}>
        <img
          src="/img/default-doc-thumbnail.png" // Replace with logic if needed
          alt="File thumbnail"
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
        />
        <div>
          <a
            href={`http://localhost:3000/uploads/${data.file_link}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: "bold", color: "#1a73e8", textDecoration: "none" }}
          >
            {data.file_original_name}
          </a>
          <p style={{ fontSize: "0.85rem", color: "gray" }}>Microsoft Word</p>
        </div>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <h4>Feedback</h4>
        <p style={{ whiteSpace: "pre-wrap" }}>{data.feedback}</p>
      </div>
    </div>
  );
};

export default AssignmentCheck;
