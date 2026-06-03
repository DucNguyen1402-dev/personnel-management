const POSITION_COEFFICIENTS = {
    sep: 3,
    "truong-phong": 2,
    "nhan-vien": 1,
};
const POSITION_LABELS = {
    "nhan-vien": "Nhân viên",
    "truong-phong": "Trưởng phòng",
    "sep": "Sếp",
};


export class Employee {
    constructor(data) {
        this.id = crypto.randomUUID();
        this.account = data.account;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.workDate = data.workDate;
        this.position = data.position;
        this.baseSalary = data.baseSalary;
        this.workingHours = data.workingHours;

    }

    get totalSalary() {
        const coefficient = POSITION_COEFFICIENTS[this.position] ?? 0;
        return (coefficient * this.baseSalary).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    }
    get rank() {
        if (this.workingHours < 160) return "Trung bình";
        if (this.workingHours < 176) return "Khá";
        if (this.workingHours < 192) return "Giỏi";

        return "Xuất sắc";
    }
    get positionLabel() {
        return POSITION_LABELS[this.position] ?? this.position;
    }

}