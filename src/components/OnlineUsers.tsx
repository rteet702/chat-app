interface Props {
    onlineUsers: User[];
}

type User = {
    name: string;
    email: string;
};

const OnlineUsers = (props: Props) => {
    const { onlineUsers } = props;

    if (onlineUsers.length > 0) {
        return (
            <div className="flex-[1] h-full overflow-y-scroll flex flex-col gap-3">
                {onlineUsers.map((user, index) => {
                    return (
                        <div
                            key={index}
                            className="rounded px-5 py-2 bg-neutral-500 bg-opacity-30 flex items-center justify-between"
                        >
                            {user.name}
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                    );
                })}
            </div>
        );
    }
    return <p>No users online...</p>;
};

export default OnlineUsers;
