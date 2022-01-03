
export default function Spinner({ isLoading }) {
    if (isLoading) {
        return (
            <div className="spinner-wrap">
                <div className="spinner-border text-primary " >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <></>
    )
}
