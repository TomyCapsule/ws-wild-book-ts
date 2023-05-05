import { ReactNode, createContext, useMemo, useState } from "react"
import { Wilder } from "../types/Wilder"

interface ProviderProps{
    children: ReactNode
};

interface ContextProps {
    wildersList: Wilder[],
    setWildersList: (wildersList: Wilder[]) => void
};

const WildersListContext = createContext<ContextProps>({
    wildersList: [],
    setWildersList: () => null
});

const WildersListProvider = ({children}: ProviderProps) => {
    const [wildersList, setWildersList] = useState<Wilder[]>([]);

    const value = useMemo(() => ({
        wildersList,
        setWildersList
    }), [wildersList]);

    return(
        <WildersListContext.Provider value={value}>
            {children}
        </WildersListContext.Provider>
    )
};

export { WildersListContext, WildersListProvider};