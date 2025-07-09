import sys
import json
from ortools.constraint_solver import pywrapcp, routing_enums_pb2

def create_data_model(locations, demands, vehicle_capacity):
    return {
        'locations': locations,
        'demands': demands,
        'num_vehicles': 1,
        'vehicle_capacities': [vehicle_capacity],
        'depot': 0,
    }

def compute_euclidean_distance_matrix(locations):
    distances = {}
    for from_idx, from_node in enumerate(locations):
        distances[from_idx] = {}
        for to_idx, to_node in enumerate(locations):
            if from_idx == to_idx:
                distances[from_idx][to_idx] = 0
            else:
                distances[from_idx][to_idx] = int(
                    ((from_node[0] - to_node[0]) ** 2 + (from_node[1] - to_node[1]) ** 2) ** 0.5 * 1000
                )
    return distances

def solve_tsp_with_capacity(locations, demands, vehicle_capacity):
    data = create_data_model(locations, demands, vehicle_capacity)
    distance_matrix = compute_euclidean_distance_matrix(data['locations'])

    manager = pywrapcp.RoutingIndexManager(len(distance_matrix), data['num_vehicles'], data['depot'])
    routing = pywrapcp.RoutingModel(manager)

    def distance_callback(from_index, to_index):
        return distance_matrix[manager.IndexToNode(from_index)][manager.IndexToNode(to_index)]

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    def demand_callback(from_index):
        return data['demands'][manager.IndexToNode(from_index)]

    demand_callback_index = routing.RegisterUnaryTransitCallback(demand_callback)
    routing.AddDimensionWithVehicleCapacity(
        demand_callback_index,
        0,
        data['vehicle_capacities'],
        True,
        'Capacity'
    )

    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC

    solution = routing.SolveWithParameters(search_parameters)

    if not solution:
        return []

    index = routing.Start(0)
    route = []
    while not routing.IsEnd(index):
        route.append(manager.IndexToNode(index))
        index = solution.Value(routing.NextVar(index))
    route.append(manager.IndexToNode(index))  # Return to depot
    return route

def main():
    try:
        input_data = sys.stdin.read()
        payload = json.loads(input_data)

        locations = payload.get("locations", [])
        demands = payload.get("demands", [])
        vehicle_capacity = payload.get("vehicle_capacity", 0)

        route = solve_tsp_with_capacity(locations, demands, vehicle_capacity)
        print(json.dumps({"route": route}))

    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
