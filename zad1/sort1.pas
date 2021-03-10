PROGRAM sort;

VAR
    list: array[1..100] of Integer;
    i, j, temp: Integer;
    max_value: Integer = 100;
    num: Integer = 100;

PROCEDURE SeedArrayWithRandoms(var arr: array of Integer);
BEGIN
    FOR i:=1 TO num DO
    BEGIN
        arr[i] := Random(max_value) + 1;
    END;
END;

PROCEDURE SortArray(var arr: array of Integer);
BEGIN
    FOR i:=1 TO num DO
    BEGIN
        FOR j:=1 to num-1 DO
        BEGIN
            if arr[j] > arr[j + 1] THEN
            BEGIN
                temp := arr[j];
                arr[j] := arr[j + 1];
                arr[j + 1] := temp;
            END;
        END;
    END;
END;

BEGIN    
    SeedArrayWithRandoms(list);
    SortArray(list);

    FOR i:=1 TO num DO
    BEGIN
        writeln(list[i]);
    END;
END.