import { Skeleton } from "@/components/ui/skeleton";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components";

export default function Loading() {
    const items = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
    ];

    return (
        <>
            {items?.map((item) => (
                <Card className="w-full group relative" key={item.id}>
                    <CardHeader className="p-0">
                        <Skeleton className="h-[240px] w-full rounded-xl" />
                    </CardHeader>
                    <CardContent className="p-3">
                        <CardTitle className="font-medium text-sm flex flex-row">
                            <Skeleton className="h-4 w-[250px]" />
                        </CardTitle>
                        <div className="py-2.5 flex flex-row justify-between">
                            <Skeleton className="h-4 w-[100px]" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}