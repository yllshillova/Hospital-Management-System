import Employee from "./Employee";
export default interface Contract
{ 
    id: string; 
    name: string;
    createdAt: Date;
    updatedAt: Date;
    startDate: Date;
    employeeId: string;
    employee: Employee;
}