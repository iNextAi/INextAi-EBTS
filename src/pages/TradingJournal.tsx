import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Trash2 } from "lucide-react";
import { useState } from "react";

const TradingJournal = () => {
  const [journalEntry, setJournalEntry] = useState("");

  const recentEntries = [
    {
      id: 1,
      date: "07/09/25",
      time: "14:30",
      preview: "Exited early...",
    },
    {
      id: 2,
      date: "07/09/25", 
      time: "14:30",
      preview: "Exited early...",
    },
    {
      id: 3,
      date: "07/09/25",
      time: "14:30", 
      preview: "Exited early...",
    },
    {
      id: 4,
      date: "07/09/25",
      time: "14:30",
      preview: "Exited early...",
    },
    {
      id: 5,
      date: "07/09/25",
      time: "14:30",
      preview: "Exited early...",
    },
  ];

  const handleSaveEntry = () => {
    if (journalEntry.trim()) {
      // Handle saving the entry
      setJournalEntry("");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="text-primary" size={20} />
          <h1 className="text-xl font-semibold text-foreground">Trading Journal</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
          {/* Main Journal Area */}
          <div className="lg:col-span-2">
            <Card className="h-full bg-card border border-border">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex-1 mb-4">
                  {/* Large empty area for journal content */}
                  <div className="h-full min-h-[400px] bg-background/50 rounded-lg border border-border/50"></div>
                </div>
                
                {/* Bottom input area */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Log your thought, emotions and trading rationale..."
                    value={journalEntry}
                    onChange={(e) => setJournalEntry(e.target.value)}
                    className="flex-1 min-h-[60px] bg-background border-border resize-none"
                  />
                  <Button 
                    onClick={handleSaveEntry}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                  >
                    Save entry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Entries Sidebar */}
          <div>
            <Card className="h-full bg-card border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="text-primary" size={16} />
                  <h2 className="text-lg font-semibold text-foreground">Recent Entries</h2>
                </div>
                
                <div className="space-y-3">
                  {recentEntries.map((entry) => (
                    <div key={entry.id} className="group">
                      <div className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-background/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-foreground">{entry.date}</span>
                            <span className="text-xs text-muted-foreground">{entry.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{entry.preview}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TradingJournal;