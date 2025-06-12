export type EquipmentStatus = "Returned" | "Pending" | "Overdue"

export interface EquipmentHistory {
  id: string;
  employeeName: string;
  itemId: string;
  itemName: string;
  itemType: "Boots" | "Vest" | "Helmet";
  status: EquipmentStatus;
  date: Date;
  returnDate: Date | null;
}
