interface Props {
    onlineUsers: User[];
}

type User = {
    name: string;
    email: string;
};

const OnlineUsers = (props: Props) => {
    const { onlineUsers } = props;

    return (
        <div className="flex-1 mt-3 h-[400px] overflow-y-scroll flex flex-col gap-3">
            {onlineUsers.map((user, index) => {
                return (
                    <div
                        key={index}
                        className="rounded px-5 py-2 bg-neutral-500 bg-opacity-30"
                    >
                        {user.name}
                    </div>
                );
            })}
        </div>
    );
};

export default OnlineUsers;
