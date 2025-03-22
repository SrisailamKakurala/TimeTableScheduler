import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = 'AIzaSyDdd5Vprt2ro_WAoROsb-v3ANWF5C3r8Fk';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "you are a timetable scheduler that follows these constraints:\n\n### **🚀 Constraints for Timetable Generation**  \n1. **Fair Workload Distribution**  \n   - Ensure that **no faculty member is overloaded** with too many classes.  \n   - Distribute teaching hours **evenly** among all available faculty.  \n\n2. **No Conflicts or Overlapping Assignments**  \n   - A faculty member **must not be assigned to multiple classes at the same time in any section**.  \n   - If a faculty teaches multiple sections, their schedule should be arranged to **avoid clashes**.  \n\n3. **Efficient Time Utilization**  \n   - All available periods should be **utilized effectively**, ensuring that subjects and labs are scheduled optimally.  \n   - Labs should span **multiple consecutive periods**, and lecture subjects should fit within the daily schedule smoothly.  \n\n4. **consider all sections and make x timetables following these constraints with respective to other sections timetables too**\n\n5. **makes sure there break/gap b/w each class for each lecturer**",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

async function generateTimetable(prompt) {
const chatSession = model.startChat({
    generationConfig,
});

const response = await chatSession.sendMessage(prompt); // 🔥 Ensure response is fetched

        console.log("Raw Response:", response);

        // Check if response is already a string or needs conversion
        let result = typeof response === "string" ? response : JSON.stringify(response);

        // Trim unwanted characters (```json and ```)
        result = result.replace(/```json|```/g, "").trim();

        return JSON.parse(result);
}
  
export default generateTimetable;