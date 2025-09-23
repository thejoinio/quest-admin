interface IProgressBarProps { 
    currentPoint: number;
    totalPoints: number;
    nextRank: string;
}

export const ProgressBar = ({currentPoint, totalPoints, nextRank}: IProgressBarProps) => {
    const progressPercentage = (currentPoint / totalPoints) * 100;
    return (
        <div className="flex flex-col custom-gradient-border rounded-[8.348px] p-2">
            <div className="flex justify-between">
                <p className="font-semibold text-xs">Next</p>
                <p className="font-semibold text-xs">{nextRank}</p>
            </div>
            <div className="flex w-full h-2 custom-gradient-bg rounded-3xl mt-2 mb-0.5">
                <div style={{width: `${progressPercentage}%`}} className={`flex h-2 bg-primary-purple rounded-3xl`}></div>
            </div>
            <div className="text-[6.678px]">{currentPoint}/{totalPoints}pts</div>
        </div>
    )
}