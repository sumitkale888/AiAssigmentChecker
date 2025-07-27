// Interface for a single user object
interface User {
    first_name: string;
    last_name: string;
    email: string;
    url_dp: string; // URL for display picture
}

// Interface for the props of the UserList component
interface UserListProps {
    users: User[];
}

// UserList component to display a list of users
const PeopleList: React.FC<UserListProps> = ({ users }) => {
    return (
        <div className="space-y-4 p-4 rounded-lg ">
            {users.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No users available yet.</p>
            ) : (
                users.map((user, index) => (
                    <div
                        key={index} // Using index as key, consider a unique ID if available in real data
                        className="bg-white p-6 rounded-4xl shadow-md border border-gray-200 flex items-center hover:shadow-lg transition-shadow duration-200"
                    >
                        <img
                            src={user.url_dp}
                            alt={`${user.first_name} ${user.last_name}'s profile`}
                            className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-400"
                            // Fallback for broken images
                            onError={(e) => {
                                e.currentTarget.src = `https://placehold.co/64x64/cccccc/333333?text=${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
                            }}
                        />
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">{user.first_name} {user.last_name}</h3>
                            <p className="text-blue-600 text-sm">{user.email}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default PeopleList;