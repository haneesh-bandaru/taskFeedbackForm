import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegserviceService } from '../regservice.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent {
  branchOpt: any;
  cols: any[] = [];
  facultyOpt: any;
  subjectOpt: any;
  feedback: FormGroup | any;
  semesterOpt: any;
  data: any;
  yearOpt: any;
  semOpt: any;
  hodOpt: any;

  constructor(public service: RegserviceService) {
    this.branchOpt = ['CSE', 'IT', 'ECE', 'MECH', 'CIVIL', 'EEE','MET','BS & HSS'];
    this.facultyOpt = ['Dr.Ch.Bindu Madhuri', 'Dr. B. Tirimula Rao', 'Pynam Venkateswarlu', 'Prof. G. Jaya Suma','Dr. Kolli. Srikanth '];
    this.subjectOpt = ['ACD', 'AWS', 'AJP', 'ML', 'CNS'];
    this.yearOpt = ['I', 'II', 'III', 'IV'];
    this.semesterOpt = ['I', 'II'];
    this.hodOpt = ['Dr. P. Aruna Kumari','Dr. B. Tirimula Rao','Dr. B. Nalini','Dr.C.Neelima Devi','Dr. K. Srinivasa Prasad','Dr.A.Padmaja','Prof.G.Swami Naidu','Dr. G. J. Naga Rajux'];
  }

  ngOnInit(): void {
    this.feedback = new FormGroup({
      acadamic_year: new FormControl('', [Validators.required]),
      Year: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      faculty_name: new FormControl('', [Validators.required]),
      Subject: new FormControl('', [Validators.required]),
      semester: new FormControl('', [Validators.required]),
      Feedback: new FormControl('', [Validators.required]),
      hodname: new FormControl('', [Validators.required]),
    });
  }

  public convertToPDF1() {
    this.convertToPDF();
    this.Submit();
  }

  public convertToPDF() {
    html2canvas(document.body).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      var position = 0;
      var heightLeft = height;

      while (heightLeft > 0) {
        position = heightLeft - height;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, width, height);
        heightLeft -= height;
      }

      pdf.save('Feedback.pdf');
    });
  }

  tableData: any = [
    { "SL_No": 1, "Characteristics": "Knowledge of the subject" },
    { "SL_No": 2, "Characteristics": "Coming well prepared for the class" },
    { "SL_No": 3, "Characteristics": "Giving clear Explanations" },
    { "SL_No": 4, "Characteristics": "Command of Language" },
    { "SL_No": 5, "Characteristics": "Clear and Audible Voice" },
    { "SL_No": 6, "Characteristics": "Holding the attention of students through the Class" },
    { "SL_No": 7, "Characteristics": "Providing more matter than in the textbook" },
    { "SL_No": 8, "Characteristics": "Capability to clear the doubts of Students" },
    { "SL_No": 9, "Characteristics": "Encouraging students to ask questions and participate in Discussion" },
    { "SL_No": 10, "Characteristics": "Appreciating students as and when Deserving" },
    { "SL_No": 11, "Characteristics": "Willingness to help students even out of Class" },
    { "SL_No": 12, "Characteristics": "Return of value Test Papers/Records in Time" },
    { "SL_No": 13, "Characteristics": "Punctuality and following Time Table Schedule" },
    { "SL_No": 14, "Characteristics": "Coverage of Syllabus" },
    { "SL_No": 15, "Characteristics": "Impartial(Treating all students alike)" }
  ];

  Submit() {
    let data: any = {};
    for (let item of this.tableData) {
      if (item.Grade) {
        data[item.Characteristics] = item.Grade;
      }
    }

    data.department = this.feedback.controls.department.value;
    data.hod_name = this.feedback.controls.hodname.value;
    data.acadamic_year = this.feedback.controls.acadamic_year.value;
    data.faculty_name = this.feedback.controls.faculty_name.value;
    data.subject_name = this.feedback.controls.Subject.value;
    data.year = this.feedback.controls.Year.value;
    data.semester = this.feedback.controls.semester.value;

    console.log(data);
  }
}
