def insertSort(list):
    for item in range(1, len(list)):
        key = list[item]
        for x in range(item-1, -1, -1):
            if list[x] > key:
                list.remove(key)
                list.insert(x , key)
                print(list)
    return list




array = [3, 2, 4, 6, 1, 9, 7, 10, 8, 5]

#print(insert(array, 4))


print(insertSort(array))



