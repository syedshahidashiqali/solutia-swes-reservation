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


export type ItemTypes = "Boots" | "Vest" | "Helmet"
export type StatusTypes = "Returned" | "Pending" | "Overdue"

export interface FilterStateI {
  search: string;
  // itemType: string;
  // status: string[];
  itemType: ItemTypes | string;
  status: StatusTypes[];
  dateRange: {
    from?: Date;
    to?: Date;
  };
}