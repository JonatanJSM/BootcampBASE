import { IconPlus, IconUser } from "@tabler/icons-react";
import { CreateClientModal, DropdownOrderBy, Header, SearchInput } from "../components";
import { useEffect, useState } from "react";
import { Client as IClient } from "../interfaces";
import { Client } from "../components/Client";
import { clientsMock } from "../mocks";
import { useToggle } from "../hooks";

export const Clients = () => {
	const [clients, setCliets] = useState<IClient[]>([]);
    const [currenOrderOption, setCurrenOrderOption] = useState("customerId");
    const [counter, setCounter] = useState(0);
	const [isOpen, setIsOpen] = useToggle();

	const oprderOptopns : {label: string; value: string}[]=[
        {label: "Nombre",value: "name",},
        {label: "ID", value: "customerId",},
        {label: "Curp",value: "curp",},
        {label: "edad",value: "birthdate",},
    ];

	useEffect(() => {
		// Aqui el mecero todavía no ha llevado la orden
		// primero recoge todas las ordenes 
		// entonces en la segunda linea todavia no hay clientes
		// setClient(clientsMock)
		// setClient(orderClientes(clients))
        setCliets(clientsMock);
        setCliets((prevState) => orderClients(prevState, currenOrderOption));
    }, []);

    const orderClients = (clients: IClient[], currenOrderOption: string,): IClient[] => {
    	let key = currenOrderOption as keyof (typeof clients)[0];
    	const newClients: IClient[] = clients.sort((a: IClient, b: IClient) => {
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
            return 0;
        });
        return newClients;
    };

	// Esta se ejecuta en el hijo
    const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrenOrderOption(e.target.value);
        setCliets(orderClients(clients, e.target.value));
    };

	const handleSearch = (SearchWord : string) => {
		if(SearchWord === ""){
			setCliets(clientsMock);
		}else{
			let newClientes = clientsMock.filter((client)=>{
				if(SearchWord === client.customerId.toString())
					return client;
			})
			setCliets(newClientes);
		}
    };

	return (
		<>
		<CreateClientModal 
		isOpen={isOpen}
		onClose={() => {
			setIsOpen()
		}}
	/>
			<Header>
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">
					Clientes
				</h1>
				<div className="flex sm:w-96 w-full gap-2">
					{/* Dropdown es el hijo de clients */}
					{/* En el onchange se pasa la funcion que se vaya a ejecutar cuando el el hijo p se dispare un evento onchage */}
					<DropdownOrderBy
						onChange={handleDropdown}
						options={oprderOptopns}
						value={currenOrderOption}
					/>
					<SearchInput
						Icon={IconUser}
						onSearch={(e)=>handleSearch(e.target.value)}
						propertie="clientes"
					>
						<button 
							type="button"
							onClick={()=>{
								console.log(counter);
								setCounter(counter+1);
								setIsOpen()
							}}
							className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
							<IconPlus className="w-4 h-4" />
						</button>
					</SearchInput>
				</div>
			</Header>

			<section className="flex flex-col items-center h-[calc(100vh-10rem)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<ul
					role="list"
					className="my-4 overflow-auto divide-y divide-gray-100"
				>
					{
						clients.length === 0 ? (<div className="flex flex-col items-center justify-center h-full">
							<p className="text-3xl font-bold text-center">
								¡Oh no! :(
							</p><p className="mt-5 text-lg text-center">
								Algo no ha salido como esperabamos. Por favor,
								intentalo más tarde.
							</p></div>):
						clients.map((client)=>(
						 <Client client={client} key = {client.customerId}/>
					))}
				</ul>
			</section>
			
		</>
	);
};
