"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import GenericForm from "@/components/crud/form/GenericForm";
import { CrudConfig } from "@/lib/clientSchema/crud/schema";
import { FieldValues } from "react-hook-form";
import React, { useState } from "react";

const FormDialog = <TForm extends FieldValues, TRow>({
  config,
  editData,
  setEditData,
}: {
  config: CrudConfig<TForm, TRow>;
  editData: TForm | null;
  setEditData: (data: TForm | null) => void;
}) => {
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const isEditMode = editData !== null;
  return (
    <Dialog
      open={editData !== null || openAdd}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setOpenAdd(false);
          setEditData(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setEditData(null);
            setOpenAdd(true);
          }}
        >
          <PlusIcon />
          Add {config.entityName}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-2/3 overflow-scroll">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit " : "Add "}
            {config.entityName}
          </DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>
        <GenericForm
          config={config}
          editData={editData}
          isEditMode={isEditMode}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
