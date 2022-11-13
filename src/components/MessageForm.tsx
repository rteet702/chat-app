interface Props {
    handleSubmit: CallableFunction;
    setMessage: CallableFunction;
    message: string;
    loggedInUser: User;
}

type User =
    | {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
      }
    | undefined;

const MessageForm = (props: Props) => {
    const { handleSubmit, setMessage, message, loggedInUser } = props;

    if (message.trim().length > 0) {
        return (
            <form
                className="flex"
                onSubmit={(e) => handleSubmit(e, loggedInUser)}
            >
                <input
                    type="text"
                    name="content"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="p-3 bg-neutral-500 bg-opacity-10 flex-[3] rounded-bl"
                />
                <button
                    type="submit"
                    className="bg-purple-900 bg-opacity-60 hover:bg-opacity-80 transition-colors flex-1 rounded-br"
                >
                    Send
                </button>
            </form>
        );
    }

    return (
        <form className="flex" onSubmit={(e) => handleSubmit(e, loggedInUser)}>
            <input
                type="text"
                name="content"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-3 bg-neutral-500 bg-opacity-10 flex-[3] rounded-bl"
            />
            <button
                type="submit"
                disabled={true}
                className="bg-purple-900 bg-opacity-20 transition-colors flex-1 rounded-br"
            >
                Send
            </button>
        </form>
    );
};

export default MessageForm;
