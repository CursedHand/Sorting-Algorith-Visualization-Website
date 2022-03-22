Inparray = [38, 27, 43, 3, 9, 82, 10]


def mergeSort(array):
    if len(array) > 1:
        half = len(array)//2
        L = array[:half]
        R = array[half:]

        L = mergeSort(L)
        R = mergeSort(R)

        out = merge(L, R)
        return out
    else:
        return array

def merge(L, R):
    full = L + R
    merged = []
    while len(full) > 0:
        merged.append(min(full))
        full.remove(min(full))
    return merged







print(mergeSort(Inparray))

