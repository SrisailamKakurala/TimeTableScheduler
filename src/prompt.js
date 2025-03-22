export const prompt = `
Generate a JSX React component that renders a structured x timetables for x sections of y branch[sections and branch are given in below data] with the following constraints:

1. The timetable should be displayed in a **table format using table tags** with **six days (Monday to Saturday)**.
2. Each day contains **n periods** [given below in data] with a **lunch break in between**.
3. Some subjects like **labs** span multiple periods [the no.of periods it will span will be mentioned below].
4. Below the main timetable, include a **"Subject Details"** table listing:
   - Subject Name
   - Faculty Name
5. The JSX should use **TailwindCSS** classes for styling.
6. The timetable should have **borders, alternating row colors, and bold headers**.

Data:

Days and Periods:
| Day  | 09:40-10:40 | 10:40-11:40 |  11:40-12:40  | Lunch | 01:20-02:20 | 02:20-03:20 | 03:20-04:20 | // gaps may vary depending on period duration
|------|-------------|-------------|---------------|-------|-------------|-------------|-------------|
| MON  | CD          | ML          | DevOps        |   L   | IOT         | FSD         | EIA         |
| TUE  | EIA         | IOT         | FSD           |   U   |                DevOps LAB               |
| WED  | IOT         | FSD         | CD            |   N   |                   ML LAB                |
| THU  | FSD         | IOT         | SPORTS        |   C   | CD          |   ML        |     EIA     |
| FRI  | ML          | EIA         | CD            |   H   |     FSD     |  DevOps     | Library     |
| SAT  | DevOps      | CD          | ML            |       | DevOps      | IOT         | MENTORING   |

Subjects Reference:
| Subject                                               |                Faculty Name                |
|-------------------------------------------------------|--------------------------------------------|
| DevOps                                                |                Mr. Kiran                   |
| Compiler Design                                       |                Dr. K.L.S. Sirisha          |
| Machine Learning                                      |                Mrs. R. Pavitra             |
| Full Stack Development                                |                Shaik Mahamood Basha        |
| Internet of Things                                    |                Dr. N. Chandra Kala         |
| Environmental Impact Assessment                       |                Mrs. B. Karuna              |
| DevOps Lab (N-206)                                    |                Mr. Kiran                   |
| Machine Learning Lab (N-206)                          |              Mrs. R. Pavitra / Shaik Basha |
| Mandatory Course (IPR)                                |                N/A                         |

Ensure the JSX output is structured, readable, and properly formatted.

---

### **🚀 Constraints for Timetable Generation**  
1. **Fair Workload Distribution**  
   - Ensure that **no faculty member is overloaded** with too many classes.  
   - Distribute teaching hours **evenly** among all available faculty.  

2. **No Conflicts or Overlapping Assignments**  
   - A faculty member **must not be assigned to multiple classes at the same time in any section**.  
   - If a faculty teaches multiple sections, their schedule should be arranged to **avoid clashes**.  

3. **Efficient Time Utilization**  
   - All available periods should be **utilized effectively**, ensuring that subjects and labs are scheduled optimally.  
   - Labs should span **multiple consecutive periods**, and lecture subjects should fit within the daily schedule smoothly.  

4. **consider all sections and make x timetables following these constraints with respective to other sections timetables too**

5. **makes sure there break/gap b/w each class for each lecturer**

---

below is the data:
make timetables for this data by following the above format in jsx:


*****NO SECTION SHOULD HAVE SAME TEACHER AT SAME TIME CONSIDERING ALL SECTIONS*****


the only thing i need is the jsx code in that we return.. no imports no exports nothing .. just the thing that we'll return in a component

example:
<div className="...">
...all the tables and all
</div>

NOTE: make sure to assign sports, library, and mentoring periods too, there is no rule that every subject should happen daily! just 3-4 classes a week for each subject is enough and in remaning time we do labs, library, sports, and mentoring. 
`