interface Props {
    name: string;
    email: string;
    content: string;
    loggedInUser: string | null | undefined;
}

const Message = (props: Props) => {
    const { name, email, content, loggedInUser } = props;

    if (loggedInUser === email) {
        return (
            <div className="bg-cyan-900 text-right px-4 py-2 rounded shadow-lg">
                <p className="text-xl font-bold">{name}</p>
                <p>{content}</p>
            </div>
        );
    } else {
        return (
            <div className="bg-purple-900 px-4 py-2 rounded shadow-lg">
                <p className="text-xl font-bold">{name}</p>
                <p>{content}</p>
            </div>
        );
    }
};

export default Message;
