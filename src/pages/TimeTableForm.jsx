import generateTimetable from "../services/ai.service";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { prompt } from "../prompt";
import { useNavigate } from "react-router-dom";

const TimeTableForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branch: "",
    year: "",
    semester: "",
    sections: "",
    facultyCount: "",
    subjects: "",
    labSubjects: "",
    totalPeriods: "",
    noOfPeriodsForLab: "",
    periodDuration: "",
    faculty: [{ name: "", specialization: "" }],
    subjectsData: [{ name: "", faculty: [] }],
  });

  // 📌 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 Handle Faculty Change
  const handleFacultyChange = (index, e) => {
    const newFaculty = [...formData.faculty];
    newFaculty[index][e.target.name] = e.target.value;
    setFormData({ ...formData, faculty: newFaculty });
  };

  // 📌 Add Faculty
  const addFaculty = () => {
    setFormData({
      ...formData,
      faculty: [...formData.faculty, { name: "", specialization: "" }],
    });
  };

  // 📌 Delete Faculty
  const deleteFaculty = (index) => {
    const newFaculty = [...formData.faculty];
    newFaculty.splice(index, 1);
    setFormData({ ...formData, faculty: newFaculty });
  };

  // 📌 Add Subject
  const addSubject = () => {
    setFormData({
      ...formData,
      subjectsData: [...formData.subjectsData, { name: "", faculty: [] }],
    });
  };

  // 📌 Handle Subject Change
  const handleSubjectChange = (index, e) => {
    const newSubjects = [...formData.subjectsData];
    newSubjects[index][e.target.name] = e.target.value;
    setFormData({ ...formData, subjectsData: newSubjects });
  };

  // 📌 Faculty Drag Component
  const FacultyItem = ({ name }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "FACULTY",
      item: { name },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        className={`cursor-pointer bg-blue-100 text-blue-700 p-2 rounded shadow ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      >
        {name}
      </div>
    );
  };

  // 📌 Subject Drop Area Component
  const SubjectDropArea = ({ subjectIndex }) => {
    const [{ isOver }, drop] = useDrop({
      accept: "FACULTY",
      drop: (item) => assignFaculty(subjectIndex, item.name),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    const assignFaculty = (index, facultyName) => {
      const newSubjects = [...formData.subjectsData];
      if (!newSubjects[index].faculty.includes(facultyName)) {
        newSubjects[index].faculty.push(facultyName);
        setFormData({ ...formData, subjectsData: newSubjects });
      }
    };

    return (
      <div
        ref={drop}
        className={`min-h-12 p-2 border border-dashed ${
          isOver ? "bg-green-100" : "bg-gray-50"
        }`}
      >
        {formData.subjectsData[subjectIndex].faculty.length > 0 ? (
          formData.subjectsData[subjectIndex].faculty.map((name, i) => (
            <div key={i} className="bg-gray-200 p-1 rounded m-1">{name}</div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">Drag faculty here</p>
        )}
      </div>
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log("Generating timetable with data:", formData);
      
      const jsxTimetable = await generateTimetable(`${prompt}` + JSON.stringify(formData));
      
      setLoading(false);
      navigate("/timetables", { state: { timetable: jsxTimetable, formData } }); // 🚀 Pass formData along with timetable
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };
  

  if (loading) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        Spinning Up Timetable
      </div>
    );
  }
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Create Timetable
        </h2>

        {/* Step 1: Basic Details */}
        {step === 1 && (
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Branch", name: "branch", placeholder: "CSE" },
              { label: "Year", name: "year", placeholder: "3" },
              { label: "Semester", name: "semester", placeholder: "1" },
              { label: "Sections", name: "sections", placeholder: "4" },
              { label: "Faculty Count", name: "facultyCount", placeholder: "15" },
              { label: "Total Subjects", name: "subjects", placeholder: "8" },
              { label: "Lab Subjects", name: "labSubjects", placeholder: "2" },
              { label: "Total Periods", name: "totalPeriods", placeholder: "6" },
              { label: "Periods for Lab", name: "noOfPeriodsForLab", placeholder: "3" },
              { label: "Period Duration (mins)", name: "periodDuration", placeholder: "50" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block font-medium mb-1">{label}:</label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder={label}
                />
              </div>
            ))}
          </div>
        )}

        {/* Step 2: Faculty Details */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-bold mb-2">Faculty Details</h3>
            {formData.faculty.map((fac, index) => (
              <div key={index} className="flex space-x-4 mb-4">
                <input
                  type="text"
                  name="name"
                  value={fac.name}
                  onChange={(e) => handleFacultyChange(index, e)}
                  className="w-1/3 p-2 border rounded"
                  placeholder="Faculty Name"
                />
                <input
                  type="text"
                  name="specialization"
                  value={fac.specialization}
                  onChange={(e) => handleFacultyChange(index, e)}
                  className="w-2/3 p-2 border rounded"
                  placeholder="Specializations (comma-separated)"
                />
                <button onClick={() => deleteFaculty(index)} className="text-red-600">
                  <FaTrash />
                </button>
              </div>
            ))}
            <button onClick={addFaculty} className="mt-4 bg-blue-600 text-white p-2 rounded">
              Add Faculty
            </button>
          </div>
        )}

        {/* Step 3: Subjects & Faculty Mapping */}
        {step === 3 && (
          <div className="grid grid-cols-2 gap-6">
            <div className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">Draggable Faculty</h3>
              {formData.faculty.map((fac, index) => (
                <FacultyItem key={index} name={fac.name} />
              ))}
            </div>

            <div>
              {formData.subjectsData.map((sub, index) => (
                <div key={index} className="border p-4 rounded shadow">
                  <input
                    type="text"
                    name="name"
                    value={sub.name}
                    onChange={(e) => handleSubjectChange(index, e)}
                    className="w-full p-2 border rounded"
                    placeholder="Subject Name"
                  />
                  <SubjectDropArea subjectIndex={index} />
                </div>
              ))}
              <button onClick={addSubject} className="bg-green-600 text-white p-2 rounded">
                Add Subject
              </button>
            </div>
          </div>
        )}

        {/* Navigation & Submit */}
        <div className="flex justify-between mt-6">
          {step > 1 && <button onClick={() => setStep(step - 1)}>Previous</button>}
          {step < 3 ? <button onClick={() => setStep(step + 1)}>Next</button> : <button onClick={handleSubmit}>Submit</button>}
        </div>
      </div>
    </DndProvider>
  );
};

export default TimeTableForm;
