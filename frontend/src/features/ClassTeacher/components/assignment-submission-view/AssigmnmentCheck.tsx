import React from "react";
import useFetch from "../../../../shared/hooks/UseFetch";
import wordIcon from "../../../../assets/word-document-svgrepo-com.svg";
import pptIcon from "../../../../assets/powerpoint-svgrepo-com (1).svg";
import pdfIcon from "../../../../assets/pdf-file-svgrepo-com.svg";
import fileIcon from "../../../../assets/file-svgrepo-com.svg";

const AssignmentCheck: React.FC<{
  submission_id: string | undefined;
  student_id: string | undefined;
}> = ({ submission_id, student_id }) => {
  const {
    data: assignmentsMetadata,
    error: assignmentsMetadataError,
    status: assignmentsMetadataStatus,
  } = useFetch<any[]>({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_URL}/teacher/submission/${submission_id}/student/${student_id}`,
  });

  const getFileIcon = (fileName: string) => {
    if (!fileName) return fileIcon;
    if (fileName.endsWith(".pdf")) return pdfIcon;
    if (fileName.endsWith(".docx") || fileName.endsWith(".doc")) return wordIcon;
    if (fileName.endsWith(".pptx") || fileName.endsWith(".ppt")) return pptIcon;
    return fileIcon;
  };

  const getFileTypeLabel = (fileName: string) => {
    if (!fileName) return "File";
    if (fileName.endsWith(".pdf")) return "PDF Document";
    if (fileName.endsWith(".docx") || fileName.endsWith(".doc")) return "Word Document";
    if (fileName.endsWith(".pptx") || fileName.endsWith(".ppt")) return "PowerPoint Presentation";
    return "File";
  };

  if (assignmentsMetadataStatus === "loading") return <p>Loading...</p>;
  if (assignmentsMetadataError) return <p>Error fetching data.</p>;
  if (!assignmentsMetadata || assignmentsMetadata.length === 0) return <p>No data found.</p>;

  const data = assignmentsMetadata[0];
  const fileIconSrc = getFileIcon(data.file_original_name);
  const fileTypeLabel = getFileTypeLabel(data.file_original_name);

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>{data.first_name} {data.last_name}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "gray", fontSize: "0.9rem" }}>Graded (See history)</span>
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        gap: "2rem", 
        borderTop: "1px solid #ddd", 
        paddingTop: "1rem" 
      }}>
        <div style={{ flex: 1 }}>
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
              src={fileIconSrc}
              alt="File thumbnail"
              style={{ width: "48px", height: "48px", objectFit: "contain" }}
            />
            <div>
              <a
                href={`${data.file_link}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  fontWeight: "bold", 
                  color: "#1a73e8", 
                  textDecoration: "none",
                  fontSize: "0.9rem"
                }}
              >
                {data.file_original_name}
              </a>
              <p style={{ fontSize: "0.8rem", color: "gray", margin: "0.25rem 0 0 0" }}>
                {fileTypeLabel}
              </p>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ 
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#f9f9f9",
            minHeight: "150px"
          }}>
            <h4 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1rem" }}>Feedback</h4>
            <p style={{ 
              whiteSpace: "pre-wrap", 
              margin: 0,
              fontSize: "0.9rem",
              color: "#333"
            }}>
              {data.feedback || "No feedback provided yet."}
            </p>
          </div>
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "0.5rem"
      }}>
        <span style={{ fontSize: "0.9rem", color: "#555" }}>Grade:</span>
        <span style={{ 
          fontWeight: "bold", 
          fontSize: "1.1rem",
          color: "#1a73e8"
        }}>
          {data.obtained_grade}/10
        </span>
      </div>
    </div>
  );
};

export default AssignmentCheck;