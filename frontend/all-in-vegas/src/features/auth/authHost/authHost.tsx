import { Card, CardHeader } from "@/components/ui/card";

export default function AuthHost() { 
    
    return(
        <div className="flex flex-col items-center justify-center-safe h-screen w-screen gap-10">
            <h1 className="font-extrabold text-primary flex flex-col items-center">
                Convention Platform
                <span className="text-foreground flex gap-1">
                    ALL IN <p className="text-secondary">VEGAS</p>
                </span>
            </h1>
            <Card className="h-1/2 w-1/2 border-t-4 border-t-primary">
                <CardHeader>
                    <p className="font-extrabold">CREATE YOUR ACCOUNT</p>
                    <p className="text-xs font-semibold text-muted-foreground">JOIN THE ALL IN VEGAS COMMUNITY</p>
                </CardHeader>
            </Card>
        </div>
    );
}