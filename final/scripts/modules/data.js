/* ==========================================================
   EXPRESS HANDS
   Data Fetching Module
========================================================== */

const BUSINESS_DATA_URL = "data/businesses.json";

export async function getBusinesses() {

    try {
        //Fetch all business data from the local JSON file.
        const response = await fetch(BUSINESS_DATA_URL);

        if (!response.ok) {
            throw new Error(
                `Unable to load business data: ${response.status}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error("Business data error:", error);

        throw error;
    }
}
