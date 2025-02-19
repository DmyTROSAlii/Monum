import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TaskViewSwitcher = () => {
  return (
    <Tabs className="flex-1 w-full border rounded-lg">
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger
              className="h-8 w-full lg:w-auto"
              value="table"
            >
              Table
            </TabsTrigger>
            <TabsTrigger
              className="h-8 w-full lg:w-auto"
              value="kanban"
            >
              Kanban
            </TabsTrigger>
            <TabsTrigger
              className="h-8 w-full lg:w-auto"
              value="calendar"
            >
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button
            size="sm"
            className="w-full lg:w-auto"
          >
            <PlusIcon className="size-4 mr-2" />
            New Task
          </Button>
        </div>
        <div className="px-2 mx-8 h-0.5 bg-gray-200">
          <Separator />
        </div>
        Data filters
        <div className="px-2 mx-8 h-0.5 bg-gray-200">
          <Separator />
        </div>
        <>
          <TabsContent value="table" className="mt-0">
            Data table
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            Data kanban
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            Data calendar
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};