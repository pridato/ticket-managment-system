import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CreateTicketButton from "./CreateTicketButton";
import { toast } from "sonner";
import { Card } from "../ui/card";
import TicketList from "./List/TicketList";
import TicketBoard from "./Board/TicketBoard";
import { Toaster } from "@/components/ui/sonner";

export default function TicketDashboard() {
  const [view, setView] = useState("board");

  const handleCreateSuccess = () => {
    console.log("Ticket creado");
    toast("Ticket creado", {
      description: "Tu ticket ha sido creado exitosamente.",
      action: {
        label: "Cancelar",
        onClick: () => console.log("Undo")
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="board" onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="board">Vista Tablero</TabsTrigger>
            <TabsTrigger value="list">Vista Lista</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
        <CreateTicketButton onSuccess={handleCreateSuccess} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {view === "board" ? <TicketBoard /> : <TicketList />}
        </div>
        <div>
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Analíticas</h2>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
