import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../index.css"; // Import the CSS file

const TimeTables = () => {
  const location = useLocation();
  const timetable = location.state?.timetable;
  const formdata = location.state?.formData;
  const [htmlContent, setHtmlContent] = useState("");
  const [forceRerender, setForceRerender] = useState(false);

  useEffect(() => {
    try {
      if (timetable && typeof timetable === "object") {
        // Check if the page has already reloaded
        const hasReloaded = sessionStorage.getItem("timetableReloaded");

        if (!hasReloaded) {
          sessionStorage.setItem("timetableReloaded", "true");
          window.location.reload(); // Reload the page only once
        }

        let rawText = timetable.response.candidates[0].content.parts[0].text;
        rawText = rawText.replace(/```json|```|jsx/g, "").trim();

        setHtmlContent(rawText);
        setForceRerender((prev) => !prev);
      }
    } catch (error) {
      console.error("Error parsing timetable:", error);
    }
  }, [timetable]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Timetable</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Generated Timetable</h2>
          ${htmlContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Generated Timetable</h2>
      <div className="bg-white w-full shadow-lg p-4 rounded border">
        {htmlContent ? (
          <>
            <div
              key={forceRerender} // Force re-render
              className="w-full injected-html"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            <button
              onClick={handlePrint}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
              Print Timetable
            </button>
          </>
        ) : (
          <p className="text-gray-500">No timetable available</p>
        )}
      </div>
    </div>
  );
};

export default TimeTables;
