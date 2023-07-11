import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="You aren't signed in"
                    subtitle="Sign in to see your listings"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="You have no listings"
                    subtitle="Once you list a property, it'll appear here"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings} 
                currentUser={currentUser}   
            /> 
        </ClientOnly>
    )
}

export default PropertiesPage;