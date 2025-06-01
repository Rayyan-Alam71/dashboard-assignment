import ClientProvider from "@/components/ClientProvider";

export default function DashboardLayout({children} : {children : React.ReactNode}){
    return(
        <ClientProvider>
            {children}
        </ClientProvider>
    )
}



