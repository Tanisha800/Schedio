export default function BookingsSkeleton() {
    return (
        <div className="flex flex-col gap-4 animate-pulse">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 w-full bg-card border border-border rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex flex-col gap-4 md:w-1/3">
                        <div className="flex gap-2 items-center">
                            <div className="w-20 h-5 bg-muted rounded" />
                            <div className="w-32 h-5 bg-muted rounded" />
                        </div>
                        <div className="w-48 h-4 bg-muted rounded" />
                    </div>

                    <div className="flex gap-4 mt-4 md:mt-0 justify-end md:w-1/3">
                        <div className="w-32 h-8 bg-muted rounded-md" />
                        <div className="w-8 h-8 bg-muted rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
}
